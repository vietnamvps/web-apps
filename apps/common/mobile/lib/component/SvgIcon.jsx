import React from 'react';

const SvgIcon = ({ iconId, className="svg-icon" }) => (
    <svg className={className} viewBox="0 0 22 22">
        <use xlinkHref={`resources/sprite/sprite.svg#${iconId}`} />
    </svg>
);

export default SvgIcon;