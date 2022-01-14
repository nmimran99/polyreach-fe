import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { useRef } from "react/cjs/react.development";
import useUser from "../hooks/useUser";
import { getShortName } from "../api/helper";
import { getSocketId, updateStatus } from "../api/userApi";
import useSnackbar from "../hooks/useSnackbar";
import useActiveUsers from "../hooks/useActiveUsers";
import { createCallHisotryRow } from "../api/callHistoryApi";
import useCallHistory from "../hooks/useCallHistory";

export const SocketContext = createContext();

const socket = io.connect(`${process.env.REACT_APP_BACKEND_URL}`);

export const SocketContextProvider = ({ children }) => {
	const { user, setAuth, auth } = useUser();

	const { info } = useSnackbar();
	const { activeUsers, setActiveUsers } = useActiveUsers();
	const { refreshCH } = useCallHistory();
	const [stream, setStream] = useState(null);
	const [userStream, setUserStream] = useState(null);
	const [myId, setMyId] = useState("");
	const [call, setCall] = useState(null);
	const [callAccepted, setCallAccepted] = useState(false);
	const [callEnded, setCallEnded] = useState(false);
	const [oppositeUser, setOppositeUser] = useState(null);
	const [roomId, setRoomId] = useState(null);
	const [userLeft, setUserLeft] = useState(null);
	const [chRow, setCHRow] = useState(null);
	const [initiating, setInitiating] = useState(false);

	const connectionRef = useRef();
	const timer = useRef();

	useEffect(() => {
		socket.emit("userId", user._id);

		socket.on("socketid", ({ socketId }) => {
			setMyId(socketId);
		});

		socket.on(
			"calluser",
			({ from_sid, to_sid, from_user, signal, roomId, callData }) => {
				setCHRow(callData);
				setCall({ from_sid, to_sid, from_user, signal });
				setRoomId(roomId);
			}
		);

		socket.on("callmissed", ({ caller }) => {
			refreshCH();
		});

		socket.on("callrefused", ({ receiver }) => {
			leaveCall();
			info(
				`${getShortName(receiver.info)} could not take your call at the moment.`
			);
		});

		socket.on("noanswer", ({ receiver }) => {
			leaveCall();
			info(
				`${getShortName(receiver.info)} could not take your call at the moment.`
			);
		});

		socket.on("callinitiated", ({ roomId }) => {
			setRoomId(roomId);
		});

		socket.on("userleft", ({ leaver }) => {
			setCall(null);
			if (!callAccepted) {
				refreshCH();
			}
			setUserStream(null);
			setUserLeft(true);
		});

		socket.on("statuschanged", ({ userId, status }) => {
			setActiveUsers((users) =>
				users.map((au) => {
					if (au._id == userId) {
						au.status = status;
					}
					return au;
				})
			);
		});
	}, []);

	useEffect(() => {
		if (!call) return;
		timer.current = setTimeout(() => {
			socket.emit("nopickup", {
				caller_sid: call.from_sid,
				caller: call.from_user,
				receiver: user,
				receiver_sid: myId,
				callData: chRow,
			});
			setCall(null);
		}, 10000);
		return () => {
			clearTimeout(timer.current);
		};
	}, [call]);

	const refuseCall = () => {
		socket.emit("refusedcall", { caller: call.from_sid, receiver: user });
		setCall(null);
		connectionRef.current.destroy();
	};

	const answerCall = async () => {
		setCallAccepted(true);
		clearTimeout(timer.current);

		const myStream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true,
		});

		await updateUserStatus({ ...user.status, status: "Busy" });

		setStream(myStream);
		setOppositeUser(call.from_user);

		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: myStream,
		});

		setCHRow({ ...chRow, status: "anwered" });

		peer.on("signal", (data) => {
			socket.emit("answercall", {
				signal: data,
				to: call.from_sid,
				responder: myId,
				callData: chRow,
			});
		});

		peer.on("stream", (currentStream) => {
			setUserStream(currentStream);
		});

		peer.signal(call.signal);

		connectionRef.current = peer;
	};

	const callUser = async (otherUser) => {
		setInitiating(otherUser);
		setUserLeft(false);
		const res = await getSocketId(otherUser._id);
		if (!res) {
			return false;
		}

		const callData = await createCallHisotryRow({
			from: user._id,
			to: otherUser._id,
		});
		if (callData) {
			setCHRow(callData);
		}

		await updateUserStatus({ ...user.status, status: "Busy" });

		const myStream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: true,
		});

		setStream(myStream);
		setOppositeUser(otherUser);

		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: myStream,
		});

		peer.on("signal", (data) => {
			socket.emit("calluser", {
				to_sid: res.socketId,
				signalData: data,
				from_sid: myId,
				from_user: user,
				callData,
			});
			setInitiating(false);
		});

		peer.on("stream", (currentStream) => {
			setUserStream(currentStream);
		});

		socket.on("callaccepted", (signal) => {
			setCallAccepted(true);
			peer.signal(signal);
		});

		connectionRef.current = peer;
	};

	const leaveCall = async () => {
		socket.emit("leavecall", { roomId, leaver: myId, callData: chRow });
		await updateUserStatus({ ...user.status, status: "Active" });
		window.location.reload();
	};

	const broadcastUserStatus = (user) => {
		socket.emit("statuschanged", { user, sid: myId });
	};

	const updateUserStatus = async (details) => {
		const res = await updateStatus({ userId: user._id, ...details });
		if (res) {
			broadcastUserStatus(res.user);
			setAuth({ ...auth, user: res.user });
			return true;
		}
		return false;
	};

	return (
		<SocketContext.Provider
			value={{
				call,
				callAccepted,
				stream,
				userStream,
				callEnded,
				myId,
				callUser,
				leaveCall,
				answerCall,
				refuseCall,
				oppositeUser,
				userLeft,
				broadcastUserStatus,
				updateUserStatus,
				initiating,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};
