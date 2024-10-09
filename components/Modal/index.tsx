import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { CSSTransition } from "react-transition-group";
import { useHotkeys } from "react-hotkeys-hook";
import cn from "classnames";
import styles from "./Modal.module.sass";
import Icon from "@/components/Icon";

type ModalProps = {
    className?: string;
    closeClassName?: string;
    containerClassName?: string;
    visible: boolean;
    onClose?: any;
    hideClose?: boolean;
    children: React.ReactNode;
};

const Modal = ({
    className,
    containerClassName,
    closeClassName,
    visible,
    onClose,
    hideClose,
    children,
}: ModalProps) => {
    const [loaded, setLoaded] = useState<boolean>(false);

    useHotkeys("esc", onClose);

    const initialRender = useRef(true);
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            visible ? disablePageScroll() : enablePageScroll();
        }
    }, [visible]);

    useEffect(() => setLoaded(true), []);

    const ref = useRef(null);

    return loaded
        ? createPortal(
              <CSSTransition
                  classNames={"modal"}
                  in={visible}
                  timeout={400}
                  nodeRef={ref}
                  unmountOnExit
              >
                  <div
                      className={cn("finlab-modal", styles.modal, className)}
                      onClick={onClose}
                      data-scroll-lock-scrollable
                      data-scroll-lock-fill-gap
                      ref={ref}
                  >
                      <div
                          className={cn("modal-overlay", styles.overlay)}
                      ></div>
                      <div
                          className={cn(
                              "modal-container",
                              styles.container,
                              containerClassName
                          )}
                          onClick={(e) => e.stopPropagation()}
                      >
                          {onClose && !hideClose && (
                              <button
                                  className={cn(styles.close, closeClassName)}
                                  onClick={onClose}
                              >
                                  <Icon name="close" />
                              </button>
                          )}
                          {children}
                      </div>
                  </div>
              </CSSTransition>,
              document.body
          )
        : null;
};

export default Modal;
