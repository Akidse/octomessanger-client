import React from "react";
import './fullSizeInfoContainer.scss';

type fullSizeInfoContainerProps = {
    text: string,
};

const FullSizeInfoContainer: React.FC<fullSizeInfoContainerProps> = ({
    text,
}) => (
    <div className="full-size-info-container">
        {text}
    </div>
);

export default FullSizeInfoContainer;