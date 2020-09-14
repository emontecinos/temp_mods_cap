import React from 'react';
import { Tooltip } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const DisplayPhase = (props) => {
  const { rent } = props;

  const getTitle = (key) => {
    switch (key) {
      case 'created':
        return 'Pedido Creado';
      case 'machine_confirmed':
        return 'Maquinaria Confirmada';
      case 'carriers_confirmed':
        return 'Transportistas Confirmados';
      case 'first_pay_confirmed':
        return 'Pago inicial confirmado';
      case 'in_progress':
        return 'En faena';
      case 'done':
        return 'Faena terminada';
      case 'paid':
        return 'Pago final confirmado';
      default:
        return 'Error';
    }
  };

  const currentPhase = {
    created: 1,
    machine_confirmed: 2,
    carriers_confirmed: 3,
    first_pay_confirmed: 4,
    in_progress: 5,
    done: 6,
    paid: 7,
  };

  const steps = [
    { state: 'created', id: 1 },
    { state: 'machine_confirmed', id: 2 },
    { state: 'carriers_confirmed', id: 3 },
    { state: 'first_pay_confirmed', id: 4 },
    { state: 'in_progress', id: 5 },
    { state: 'done', id: 6 },
    { state: 'paid', id: 7 },
  ];

  const nextStep = {
    created: 'machine_confirmed',
    machine_confirmed: 'carriers_confirmed',
    carriers_confirmed: 'first_pay_confirmed',
    first_pay_confirmed: 'in_progress',
    in_progress: 'done',
    done: 'paid',
    paid: 'finish',
  };

  return (
    <Stepper
      activeStep={currentPhase[rent.state]}
      style={{ backgroundColor: 'transparent' }}
    >
      {steps.map((step) => {
        if (step.state === nextStep[rent.state]) {
          if (rent.has_problem) {
            return (
              <Tooltip
                key={`${step.state}-${rent.id}-problem`}
                title={getTitle(step.state)}
              >
                <Step key={`${step.state}-${rent.id}-problem`}>
                  <StepLabel error />
                </Step>
              </Tooltip>
            );
          }
          return (
            <Tooltip
              key={`${step.state}-${rent.id}-problem`}
              title={getTitle(step.state)}
            >
              <Step key={`${step}-${rent.id}`}>
                <StepLabel />
              </Step>
            </Tooltip>
          );
        }

        return (
          <Tooltip
            key={`${step.state}-${rent.id}-problem`}
            title={getTitle(step.state)}
          >
            <Step key={`${step}-${rent.id}`}>
              <StepLabel />
            </Step>
          </Tooltip>
        );
      })}
    </Stepper>
  );
};

export default DisplayPhase;
