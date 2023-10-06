import { useState } from "react";

const useLoading = ({ defaultValue }) => {

    const [loading, setLoading] = useState(defaultValue);

    const onStart = () => setLoading(true);
    const onEnd = () => setLoading(false);

    return {
        loading,
        onStart,
        onEnd
    };
};

export default useLoading;