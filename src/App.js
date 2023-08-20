import { useState } from 'react';

import { Sticker } from './Components/Sticker';
import './styles/App.css';
import "./styles/common.scss"
import { Files } from './Components/Files';
import { Previewer } from './Components/Previewer';

function App() {

	return (
		<div className="App">
			<Files />
			<Previewer />
		</div>
	);
}

export default App;
