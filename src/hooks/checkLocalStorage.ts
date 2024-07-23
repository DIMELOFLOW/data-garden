import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Constants } from "@helpers";

const { FILE_SELECTED_FORMATS } = Constants;

export const useCheckLocalStorageAndRedirect = (): void => {
    const router = useRouter();
    const [shouldRedirect, setShouldRedirect] = useState(false);
    
    useEffect(() => {
        const formatRight = localStorage.getItem(FILE_SELECTED_FORMATS.SELECTEDFORMATRIGHT);
        const formatLeft = localStorage.getItem(FILE_SELECTED_FORMATS.SELECTEDFORMATLEFT);
        if (!formatRight || !formatLeft) {
            setShouldRedirect(true);
        }
      }, []);

    useEffect(() => {
        if (shouldRedirect) {
            router.push('/');
        }
    }, [shouldRedirect, router]);
};