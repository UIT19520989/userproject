import config from '~/config';

// Layouts
// import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import SignUp from '~/pages/SignUp';
import SignIn from '~/pages/SignIn';
import Tables from '~/pages/Tables';
import Profile from '~/pages/Profile';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.signUp, component: SignUp, layout: null },
    { path: config.routes.signIn, component: SignIn, layout: null },
    { path: config.routes.tables, component: Tables },
    { path: config.routes.profile, component: Profile },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
