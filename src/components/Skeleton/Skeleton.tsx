import 'react-loading-skeleton/dist/skeleton.css';

import React from 'react';
import Skeleton from 'react-loading-skeleton';

interface CustomSkeletonProps {
    width?: number | string;
    height?: number | string;
    count?: number;
    inline?: boolean
}

const CustomSkeleton: React.FC<CustomSkeletonProps> = ({
    width = '100%',
    height = 24,
    count = 1,
    inline = false,
}) => {
    return <Skeleton inline={inline} width={width} height={height} count={count} />;
};

export default CustomSkeleton;
