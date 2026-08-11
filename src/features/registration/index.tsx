import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useRegister } from '@/context/register';
import { stepValidators } from './utils';
import { ProgressBar } from './components/ProgressBar';
import { ProfileDetails } from './components/ProfileDetails';
import { BasicDetails } from './components/BasicDetails';
import { ReligionDetails } from './components/ReligionDetails';
import { AccountDetails } from './components/AccountDetails';
import { ConfirmDetails } from './components/ConfirmDetails';
import type { RegistrationModelProps, RegistrationStep } from './types';

const slideVariants: Variants = {
  enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%' }),
  center: { x: 0 },
  exit: (direction) => ({ x: direction > 0 ? '-100%' : '100%' }),
};

export function RegistrationModal({ isOpen, onClose }: RegistrationModelProps) {
  const { state, dispatch } = useRegister();
  const [isFirstRender, setIsFirstRender] = useState(true);
  const registerModalRef = useRef<HTMLDivElement | null>(null);

  function handleOutsideModalClick(e: React.MouseEvent<HTMLDivElement>) {
    if (
      registerModalRef.current &&
      !registerModalRef.current.contains(e.target as Node)
    ) {
      dispatch({ type: 'RESET_FORM' });
      setIsFirstRender(true);
      onClose();
    }
  }

  if (!isOpen) return null;

  function renderStep() {
    switch (state.currentStep) {
      case 1:
        return <ProfileDetails />;

      case 2:
        return <BasicDetails />;

      case 3:
        return <ReligionDetails />;

      case 4:
        return <AccountDetails />;

      case 5:
        return <ConfirmDetails />;

      default:
        return <ProfileDetails />;
    }
  }

  function handleClose() {
    dispatch({ type: 'RESET_FORM' });
    setIsFirstRender(true);
    onClose();
  }

  function handleContinueBtnClick() {
    const currentStep = state.currentStep as RegistrationStep;
    const isValid = stepValidators[currentStep](state.formData);

    if (!isValid) return;

    if (state.currentStep === 5) {
      console.log(state.formData);

      // API call here

      return;
    }

    dispatch({ type: 'NEXT_STEP' });
  }

  const currentStep = state.currentStep as RegistrationStep;
  const isContinueDisabled = !stepValidators[currentStep](state.formData);

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-black/50 z-50 flex justify-center items-center"
      onClick={handleOutsideModalClick}
    >
      <motion.div
        ref={registerModalRef}
        className="relative bg-white w-full max-w-lg min-h-150 rounded-lg shadow-xl text-black"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        <div className="w-full h-full flex flex-col">
          <div className="px-8 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-center font-semibold text-gray-900 text-3xl">
                Create Profile
              </h2>

              <button
                className="flex items-center justify-center w-10 h-10 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
                onClick={handleClose}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 px-8">
            <ProgressBar currentStep={state.currentStep} totalSteps={5} />

            <div className="relative overflow-hidden mt-8 min-h-112.5">
              <AnimatePresence mode="sync" custom={state.direction}>
                <motion.div
                  className="absolute inset-0 w-full"
                  key={state.currentStep}
                  custom={state.direction}
                  variants={slideVariants}
                  initial={isFirstRender ? false : 'enter'}
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  onAnimationComplete={() => {
                    setIsFirstRender(false);
                  }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="px-8 py-4 border-t border-gray-200">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => dispatch({ type: 'PREV_STEP' })}
                className={`
                  px-8 py-2 border border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-50
                  ${state.currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                `}
              >
                Back
              </button>

              <button
                type="button"
                disabled={isContinueDisabled}
                className={`
                  px-8 py-2 rounded-full font-semibold text-white
                  ${isContinueDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-pink-400 border border-pink-500 hover:bg-pink-500'}
                `}
                onClick={handleContinueBtnClick}
              >
                {state.currentStep === 5 ? 'Submit' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
