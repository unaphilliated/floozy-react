import React from 'react';
import '../styles/Pricing.scss';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Check from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface SubscriptionFeatures {
  "Fast Startup": boolean;
  "Save Workflows": boolean;
  "Backup Workflows": boolean;
  "Full Technical Support": boolean;
}

function newSubscriptionFeatures(
  fastStartup: boolean,
  saveWorkflows: boolean,
  backupWorkflows: boolean,
  fullTechnicalSupport: boolean
): SubscriptionFeatures {
  return {
    "Fast Startup": fastStartup,
    "Save Workflows": saveWorkflows,
    "Backup Workflows": backupWorkflows,
    "Full Technical Support": fullTechnicalSupport,
  };
}

interface SubscriptionPlan {
  name: string;
  costMonthly: string;
  costHourly: string;
  features: SubscriptionFeatures;
}

function newSubscriptionPlan(
  name: string,
  costMonthly: string,
  costHourly: string,
  features: SubscriptionFeatures
): SubscriptionPlan {
  return {
    name,
    costMonthly,
    costHourly,
    features,
  };
}


class Pricing extends React.Component {
  constructor(props: any) {
    super(props);

    this.plans = [
      newSubscriptionPlan(
        "Pay-go",
        "$0/mo",
        "$5/hr",
        newSubscriptionFeatures(
          false,
          false,
          false,
          false
        )
      ),
      newSubscriptionPlan(
        "Basic",
        "$20/mo",
        "$2.50/hr",
        newSubscriptionFeatures(
          true,
          true,
          false,
          false
        )
      ),
      newSubscriptionPlan(
        "Premium",
        "$50/mo",
        "$1.50/hr",
        newSubscriptionFeatures(
          true,
          true,
          true,
          true
        )
      ),
    ];
  }

  render() {
    return (
      <div className='pricing-page'>
        {this.plans.map((plan) => (
          <Card key={plan.name}>
            <CardContent>
              <p className='pricing-plan-name'>{plan.name}</p>
              <h3 className='pricing-plan-cost-monthly'>{plan.costMonthly}</h3>
              <h4 className='pricing-plan-cost-hourly'>{plan.costHourly}</h4>
              <ul className='pricing-feature'>
                {Object.entries(plan.features).map(([feature, included]) => (
                  <li className={included ? 'included' : 'not-included'} key={feature}>
                    {included ? <Check sx={{ color: 'green' }} /> : <CloseIcon sx={{ color: '#aaa' }} />} {feature}
                  </li>
                ))}
              </ul>
              <Button variant="contained">Get Started</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}

export default Pricing;
