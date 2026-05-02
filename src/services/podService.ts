import Axios from "axios";
import { type Pod } from "../store/PodContext";

export async function getPods(): Promise<string[] | null> {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  return ["xxxx-yyyy-zzzz", "aaaa-bbbb-cccc"]; // Simulate successful get with dummy pod data

  // return await Axios.get(
  //   "http://localhost:8080/pods", // TODO: Replace placeholder URI with environment variable
  //   { withCredentials: true }
  // )
  // .then(response => {
  //   if (response.status !== 200) {
  //     console.error('Get pods failed with status:', response.status);
  //     return null;
  //   }
  //   return response.data as Pod[];
  // })
  // .catch(error => {
  //   console.error('Get pods error:', error);
  //   return null;
  // });
}

export async function getPodInfo(podId: string): Promise<Pod | null> {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  const podInfos: Pod[] = [
    { id: "xxxx-yyyy-zzzz", name: "Pod 1", state: 20, upSince: new Date(Date.now() - 3600000) }, // Up for 1 hour
    { id: "aaaa-bbbb-cccc", name: "Pod 2", state: 10 },
  ];
  return podInfos?.find(pod => pod.id === podId) || null; // Simulate successful get with dummy pod data

  // return await Axios.get(
  //   `http://localhost:8080/podInfo/${podId}`, // TODO: Replace placeholder URI with environment variable
  //   { withCredentials: true }
  // )
  // .then(response => {
  //   if (response.status !== 200) {
  //     console.error('Get pod info failed with status:', response.status);
  //     return null;
  //   }
  //   return response.data as Pod;
  // })
  // .catch(error => {
  //   console.error('Get pod info error:', error);
  //   return null;
  // });
}

export async function startPod(podId: string): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  return true; // Simulate successful start

  // return await Axios.post(
  //   `http://localhost:8080/startPod/${podId}`, // TODO: Replace placeholder URI with environment variable
  //   undefined,
  //   { withCredentials: true }
  // )
  // .then(response => {
  //   if (response.status !== 200) {
  //     console.error('Start pod failed with status:', response.status);
  //     return false;
  //   }
  //   return true;
  // })
  // .catch(error => {
  //   console.error('Start pod error:', error);
  //   return false;
  // });
}

export async function stopPod(podId: string): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  return true; // Simulate successful stop
  
  // return await Axios.post(
  //   `http://localhost:8080/stopPod/${podId}`, // TODO: Replace placeholder URI with environment variable
  //   undefined,
  //   { withCredentials: true }
  // )
  // .then(response => {
  //   if (response.status !== 200) {
  //     console.error('Stop pod failed with status:', response.status);
  //     return false;
  //   }
  //   return true;
  // })
  // .catch(error => {
  //   console.error('Stop pod error:', error);
  //   return false;
  // });
}