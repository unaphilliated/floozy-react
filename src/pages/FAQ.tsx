import React from 'react';
import '../styles/FAQ.scss';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

class FAQ extends React.Component {
  constructor(props: any) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.FAQs = {
      "I want to start making money with AI images. Where do I start?":
        <p>We offer a fully configured, cloud hosted ComfyUI instance. No install hassle, just a start button. Whether you make your own workflows or buy a pre-made pack, drop them in and get started.</p>,
      "Do I need a good computer?":
        <p>No. All of our services are in the cloud. Nothing is run on your computer, leaving you free to use it while your images are generating in background.</p>,
      "Why not just install it myself?":
        (<div>
          <p>That's definitely an option. Here are some considerations before you start:</p>
          <ul>
            <li>Are you comfortable with Python and managing its virtual environments?</li>
            <li>Can you install packages?</li>
            <li>Have you cloned GIT repositories?</li>
            <li>Do you have the hardware? Enough VRAM?</li>
            <li>Are you willing to fully occupy your computer's hardware while you generate?</li>
            <li>Do you want to spend the time setting it up?</li>
          </ul>
        </div>),
      "What models/loras/nodes do you offer?":
        <p>Your instance will come pre-installed with the most popular models and nodes, but if you require additional models/loras/nodes just put in a ticket and we'll install them for you. A list of installed models/nodes is available in ComfyUI or under the "Models/Nodes" section.</p>,
      "What is a workflow? How do I get one?":
        <p>A workflow is a repeatable sequence of steps that load an AI model, configure it, and use it to generate images. Make one yourself or buy a pre-made pack. There are free starter workflows on websites like Civitai.com.</p>,
      "Do you offer workflows?":
        <p>We have some basic image generation with face swapping for both images and video. For more advanced workflows, there are plenty of pre-packaged workflows and tutorials online.</p>,
      "I bought a workflow from someone. What now?":
        <p>Login to Phaethon.cloud, hit "Start", open your dashboard, and drop in your workflow. Done.</p>,
      "My workflow gave me errors. What now?":
        <p>Don't worry, we fix those errors for you. Open a ticket in our Discord and we'll get back to you with any new models and custom nodes required to run your workflow.</p>,
      "Can I run multiple jobs at the same time?":
        <p>Yes, multiple jobs can be queued in the same instance. Multiple concurrent instances are not yet supported, but it is on our roadmap for the future.</p>,
      "Will my ComfyUI instance be up to date?":
        <p>Yes, we check for updates every day in ComfyUI and all custom nodes.</p>
    };

    // Initialize with "isOpen_faq_i" keys for each FAQ question, all set to false.
    this.state = Object.keys(this.FAQs).reduce((acc, question, i) => ({ ...acc, [`isOpen_faq_${i}`]: false }), {});
  }

  handleClick(event: React.ChangeEvent<HTMLInputElement>) {
    const id = event.currentTarget.id;
    this.setState((prevState: { [key: string]: boolean }) => ({ [`isOpen_${id}`]: !prevState[`isOpen_${id}`] }));
  };

  render() {
    return (
      <div className="faq-page">
        <div className="faq-card">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <List
            sx={{ width: '100%', maxWidth: 600 }}
            component="nav"
          >
            {/* Create list items for each FAQ question and answer. Collapsed state is determined by "isOpen_faq_i" keys in state. */}
            {Object.keys(this.FAQs).map((question, i) => (
              <div key={`faq_${i}`}>
                <hr className="faq-divider" />
                <ListItemButton id={`faq_${i}`} onClick={this.handleClick}>
                  {this.state[`isOpen_faq_${i}`] ? <ExpandLess /> : <ExpandMore />}
                  <p className="faq-question">{question}</p>
                </ListItemButton>
                <Collapse in={this.state[`isOpen_faq_${i}`]} timeout="auto">
                  <div className="faq-answer">
                    {this.FAQs[question]}
                  </div>
                </Collapse>
              </div>
            ))}
            <hr className="faq-divider" />
          </List>
        </div>
      </div>
    );
  }
}

export default FAQ;
