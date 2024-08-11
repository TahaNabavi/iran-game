import React, { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";


export default function LoadMore({ onSeen, text = null }: { onSeen: () => void; text: React.ReactNode | null }) {

    const { t } = useTranslation();

    const observerRef = useRef<IntersectionObserver>();
    const loadMoreCallback = useCallback(
        (el: HTMLDivElement) => {
            const handleObserver = (entries: any[]) => {
                const target = entries[0];
                if (target.isIntersecting) {
                    onSeen()
                }
            };

            const observer = new IntersectionObserver(handleObserver, {
                root: null,
                threshold: 1.0,
            });
            observer.observe(el);
            observerRef.current = observer;

            return () => {
                if (observerRef.current) {
                    observerRef.current.disconnect();
                }
            };
        },
        []
    );

    return (
        <div ref={loadMoreCallback} className="mt-4 col-12 flex-inset">
            {text === null ?
                <>
                    {t("Loading more")}<span className="loading loading-spinner loading-sm ms-2"></span>
                </> :
                <>
                    {text}
                </>}
        </div>
    )
}