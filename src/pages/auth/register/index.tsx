import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { useRegistration } from '@/context/registration';
import { stepValidators } from './utils';

import {
  ProgressBar,
  ProfileDetails,
  BasicDetails,
  ReligionDetails,
  AccountDetails,
  ConfirmDetails,
  RegistrationSuccess,
} from './components';
import { AuthInfo } from '../component/AuthInfo';

import { registerProfile } from './api/registrationApi';

type DuplicateField = 'email' | 'mobile';
type RegistrationStep = 1 | 2 | 3 | 4 | 5;

export function Register() {
  const { state, dispatch } = useRegistration();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  const navigate = useNavigate();

  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const mobileInputRef = useRef<HTMLInputElement | null>(null);

  const currentStep = state.currentStep as RegistrationStep;
  const isValidStep = stepValidators[currentStep](state.formData);

  useEffect(() => {
    return () => {
        dispatch({
            type: 'RESET_FORM',
        });
    };
  }, [dispatch])

  function resetRegistration() {
    dispatch({
      type: 'RESET_FORM',
    });

    setIsRegistrationSuccess(false);
  }

  function handleDuplicateError(field: DuplicateField, message: string) {
    dispatch({
      type: 'PREV_STEP',
    });

    dispatch({
      type: 'UPDATE_FIELD',
      payload: {
        [field]: '',
      },
    });

    dispatch({
      type: 'SET_ERRORS',
      payload: {
        [field]: message,
      },
    });

    requestAnimationFrame(() => {
      if (field === 'email') {
        emailInputRef.current?.focus();
      } else {
        mobileInputRef.current?.focus();
      }
    });
  }

  async function handleButtonClick() {
    if (!isValidStep || isSubmitting) {
      return;
    }

    if (currentStep === 5) {
      try {
        setIsSubmitting(true);

        const { day, month, year } = state.formData.dob;

        const dob = new Date(Number(year), Number(month) - 1, Number(day));

        const payload = {
          profileFor: state.formData.profileFor,
          gender: state.formData.gender,
          name: `${state.formData.firstName} ${state.formData.lastName}`,
          dob,
          religion: state.formData.religion,
          community: state.formData.community,
          email: state.formData.email,
          mobile: state.formData.mobile,
          password: state.formData.password,
        };

        await registerProfile(payload);

        setIsRegistrationSuccess(true);

        return;
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again.';

        const normalizedMessage = message.toLowerCase();

        if (
          normalizedMessage.includes('email') &&
          (normalizedMessage.includes('exist') ||
            normalizedMessage.includes('already'))
        ) {
          handleDuplicateError('email', message);

          return;
        }

        if (
          (normalizedMessage.includes('mobile') ||
            normalizedMessage.includes('phone')) &&
          (normalizedMessage.includes('exist') ||
            normalizedMessage.includes('already'))
        ) {
          handleDuplicateError('mobile', message);

          return;
        }

        toast.error(message);

        return;
      } finally {
        setIsSubmitting(false);
      }
    }

    dispatch({
      type: 'NEXT_STEP',
    });
  }

  function renderStep(step: RegistrationStep) {
    switch (step) {
      case 1:
        return <ProfileDetails />;

      case 2:
        return <BasicDetails />;

      case 3:
        return <ReligionDetails />;

      case 4:
        return (
          <AccountDetails
            emailInputRef={emailInputRef}
            mobileInputRef={mobileInputRef}
          />
        );

      case 5:
        return <ConfirmDetails />;

      default:
        return null;
    }
  }

  const steps: RegistrationStep[] = [1, 2, 3, 4, 5];

  function handleLogin() {
    resetRegistration();

    navigate('/login');
  }

  function handleHome() {
    resetRegistration();

    navigate('/');
  }

  return (
    <>
      <div
        className="
          flex items-center justify-center
          w-full h-dvh
          bg-white
          overflow-hidden
          lg:h-screen lg:px-6 lg:overflow-visible
        "
      >
        <div
          className="
            flex items-center justify-center gap-4
            w-full h-full
            lg:w-[85%] lg:max-w-325 lg:h-auto
          "
        >
          <AuthInfo />

          <section
            className="
              flex items-center justify-center
              w-full max-w-125 min-w-0 h-full px-0 py-0
              lg:h-auto sm:px-4 lg:px-10 sm:py-6 lg:py-6
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                x: 80,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                flex flex-col
                w-full h-full
                bg-[#C60D50] shadow-none rounded-none border-0
                overflow-hidden
                sm:h-auto sm:min-h-150 sm:shadow-[0_8px_26px_rgba(30,38,56,0.12)] sm:rounded-xl sm:border sm:border-[rgb(var(--color-primary-400))]
              "
            >
              <div className="shrink-0 px-6 py-5 text-center sm:px-8 sm:py-6">
                <h2 className="font-semibold text-white text-2xl sm:text-3xl">
                  Create Profile
                </h2>
              </div>

              <ProgressBar currentStep={currentStep} totalSteps={5} />

              <div
                className="
                  flex-1
                  min-h-0 px-6 py-4
                  text-white
                  overflow-y-auto overflow-x-hidden
                  sm:px-8
                "
              >
                <div className="relative w-full overflow-hidden">
                  <motion.div
                    className="flex gap-8 w-full"
                    animate={{
                      x: `calc(-${(currentStep - 1) * 100}% - ${(currentStep - 1) * 2}rem)`,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    {steps.map((step) => {
                      const isActive = step === currentStep;

                      return (
                        <div
                          key={step}
                          inert={!isActive}
                          aria-hidden={!isActive}
                          className="shrink-0 w-full"
                        >
                          {renderStep(step)}
                        </div>
                      );
                    })}
                  </motion.div>
                </div>
              </div>

              <div
                className="
                  shrink-0
                  px-6 py-5
                  border-t border-white/25
                  sm:px-8 sm:py-6
                "
              >
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    disabled={currentStep === 1}
                    onClick={() =>
                      dispatch({
                        type: 'PREV_STEP',
                      })
                    }
                    className={`
                      px-6 py-2
                      rounded-lg border border-white
                      font-medium text-white
                      transition
                      hover:bg-white/10 hover:text-white
                      sm:px-8
                      ${
                        currentStep === 1 ? 'pointer-events-none opacity-0' : ''
                      }
                    `}
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    disabled={!isValidStep || isSubmitting}
                    onClick={handleButtonClick}
                    className={`
                      min-w-30 px-6 py-2
                      rounded-lg
                      font-semibold
                      transition
                      sm:min-w-35 sm:px-8
                      ${
                        !isValidStep || isSubmitting
                          ? `cursor-not-allowed border border-white/50 bg-white/50 text-white/80`
                          : `border border-white bg-white text-[rgb(var(--color-primary-500))] hover:bg-white/90`
                      }
                    `}
                  >
                    {isSubmitting
                      ? 'Submitting...'
                      : currentStep === 5
                        ? 'Submit'
                        : 'Continue'}
                  </button>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </div>

      {isRegistrationSuccess && (
        <RegistrationSuccess onLogin={handleLogin} onHome={handleHome} />
      )}
    </>
  );
}
