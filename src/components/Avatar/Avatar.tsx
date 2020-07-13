import React from 'react';
import './Avatar.scss';

interface Props {
	avatar: string
}

const Avatar: React.FC<Props> = ({ avatar }) => {
	return (
		<img className="image_avatar" src={avatar} alt="" width="50" height="50" />
	)
};

export default Avatar;