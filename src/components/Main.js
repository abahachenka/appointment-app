import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import ClinicRegistration from './ClinicRegistration';

const Main = () => (
    <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/register' component={ClinicRegistration}/>
    </Switch>
)

export default Main;