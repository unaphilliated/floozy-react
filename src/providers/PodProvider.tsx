import React from "react";
import { AuthContext } from "../store/AuthContext";
import { PodContext } from "../store/PodContext";
import * as podApi from "../services/podService";


class PodProvider extends React.Component<{ children: React.ReactNode }> {
  constructor(props: any) {
    super(props);
    this.state = {
      pods: null,
      isLoading: true,
    };

    this.refreshIntervalId = null;

    this.refreshPods = this.refreshPods.bind(this);
    this.getPodInfo = this.getPodInfo.bind(this);
    this.startPod = this.startPod.bind(this);
    this.stopPod = this.stopPod.bind(this);
  }
    
  static contextType = AuthContext;
  declare context: React.ContextType<typeof AuthContext>;

  async refreshPods(firstLoad = false) {
    if (firstLoad) {
      this.setState({ isLoading: true });
    }

    if (!this.context.isAuthenticated) {
      this.setState({ isLoading: false });
      return;
    }

    const pods = await podApi.getPods();

    this.setState({
      pods: pods,
      isLoading: false
    });
  }

  async getPodInfo(podId: string) {
    const podInfo = await podApi.getPodInfo(podId);
    return podInfo;
  }

  async startPod(podId: string) {
    this.setState({ isLoading: true });

    const success = await podApi.startPod(podId);

    this.setState({ isLoading: false });
    return success;
  }

  async stopPod(podId: string) {
    this.setState({ isLoading: true });

    const success = await podApi.stopPod(podId);

    this.setState({ isLoading: false });
    return success;
  }

  async componentDidMount() {
    await this.refreshPods(true);

    this.refreshIntervalId = setInterval(this.refreshPods, 5000); // Refresh pods every 5 seconds
  }

  componentWillUnmount() {
    if (this.refreshIntervalId) {
      clearInterval(this.refreshIntervalId);
    }
  }

  render() {
    const value = {
      pods: this.state.pods,
      isLoading: this.state.isLoading,
      refreshPods: this.refreshPods,
      getPodInfo: this.getPodInfo,
      startPod: this.startPod,
      stopPod: this.stopPod,
    };

    return <PodContext value={value}>{this.props.children}</PodContext>;
  }
}

export default PodProvider;
