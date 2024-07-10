import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

type Metric = {
    name: string;
    value: number;
    delta: number;
    id: string;
    entries: PerformanceEntry[];
    attribution?: Record<string, unknown>;
};

type ReportHandler = (metric: Metric) => void;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
const reportWebVitals = (onPerfEntry?: ReportHandler) => {
    if (onPerfEntry && typeof onPerfEntry === 'function') {
        onCLS(onPerfEntry);
        onFCP(onPerfEntry);
        onINP(onPerfEntry);
        onLCP(onPerfEntry);
        onTTFB(onPerfEntry);
    }
};

export default reportWebVitals;
