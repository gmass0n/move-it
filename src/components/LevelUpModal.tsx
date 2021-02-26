import {
  useCallback,
  useImperativeHandle,
  forwardRef,
  useState,
  ForwardRefRenderFunction,
  useRef,
} from "react";
import { useChallenges } from "../hooks/challenges";
import styles from "../styles/components/LevelUpModal.module.css";

export interface ILevelUpModalHandles {
  open(): void;
  close(event: any): void;
}

const LevelUpModal: ForwardRefRenderFunction<ILevelUpModalHandles> = (
  _,
  ref
) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { level } = useChallenges();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const open = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const close = useCallback((event) => {
    if (
      event.target.className === styles.container ||
      event.target.className === styles.closeButton ||
      event.target.className === styles.closeButtonIcon
    ) {
      if (overlayRef.current && contentRef.current) {
        contentRef.current.style.transform = "translateY(1000px)";
        overlayRef.current.style.opacity = "0";

        setTimeout(() => {
          setIsModalOpen(false);
        }, 400);
      }
    }
  }, []);

  useImperativeHandle(ref, () => {
    return {
      open,
      close,
    };
  });

  if (!isModalOpen) {
    return null;
  }

  return (
    <>
      <div className={styles.overlay} ref={overlayRef} />

      <div className={styles.container} onClick={close}>
        <div className={styles.content} ref={contentRef}>
          <header>{level}</header>

          <strong>Parabéns</strong>

          <p>Você alcançou um novo level.</p>

          <button type="button" className={styles.closeButton} onClick={close}>
            <img
              src="/icons/close.svg"
              alt="Fechar modal"
              className={styles.closeButtonIcon}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default forwardRef(LevelUpModal);
