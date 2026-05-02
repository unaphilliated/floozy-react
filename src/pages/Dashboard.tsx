import React from 'react';
import '../styles/Dashboard.scss';
import { PodContext, PodState } from '../store/PodContext';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';


class Dashboard extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedPodId: null,
      selectedPodInfo: null,
    }

    this.defaultPodIntervalId = null;
    this.podInfoIntervalId = null;

    this.handleStartStop = this.handleStartStop.bind(this);
    this.selectDefaultPod = this.selectDefaultPod.bind(this);
    this.refreshSelectedPodInfo = this.refreshSelectedPodInfo.bind(this);
  }
  
  static contextType = PodContext;
  declare context: React.ContextType<typeof PodContext>;

  selectDefaultPod() {
    if (this.context.isLoading || this.context.pods === null || this.context.pods.length === 0) {
      return;
    }

    // TODO: Replace with something more meaningful like the longest running pod
    const defaultPodId = this.context.pods[0]

    if (defaultPodId) {
      this.setState({ selectedPodId: defaultPodId });
      if (this.defaultPodIntervalId) {
        clearInterval(this.defaultPodIntervalId);
      }
    }
  }

  async refreshSelectedPodInfo() {
    if (this.state.selectedPodId === null) {
      return;
    }

    const podInfo = await this.context.getPodInfo(this.state.selectedPodId);
    if (!podInfo) {
      console.error('Failed to refresh selected pod info');
      return;
    }

    this.setState({ selectedPodInfo: podInfo });
  }
  
  componentDidMount() {
    // Try to select default pod every 2 seconds until successful
    this.defaultPodIntervalId = setInterval(this.selectDefaultPod, 2000);

    // Try to refresh selected pod info every 5 seconds
    this.podInfoIntervalId = setInterval(this.refreshSelectedPodInfo, 5000);
  }

  componentWillUnmount() {
    if (this.defaultPodIntervalId) {
      clearInterval(this.defaultPodIntervalId);
    }
    if (this.podInfoIntervalId) {
      clearInterval(this.podInfoIntervalId);
    }
  }

  async handleStartStop() {
    if (!this.state.selectedPodId) {
      return;
    }

    if (this.state.selectedPodInfo?.state === PodState.Started) {
      await this.context.stopPod(this.state.selectedPodId);
    } 
    else if (this.state.selectedPodInfo?.state === PodState.Stopped) {
      await this.context.startPod(this.state.selectedPodId);
    }
  }

  render() {
    return (
      <div className="dashboard-page">
        <Card className="pod-info-card">
          <h3>Pod Manager</h3>
          <Button variant="contained" onClick={this.handleStartStop} disabled={this.state.selectedPodInfo === null || this.context.isLoading}>
            {
              this.state.selectedPodInfo?.state === PodState.Started ? 'Stop Pod' 
              : this.state.selectedPodInfo?.state === PodState.Starting ? 'Starting...'
              : this.state.selectedPodInfo?.state === PodState.Stopping ? 'Stopping...'
              : this.state.selectedPodInfo?.state === PodState.Stopped ? 'Start Pod' 
              : 'Loading Pod Info...'
            }
          </Button>
        </Card>
      </div>
    );
  };
}

export default Dashboard;