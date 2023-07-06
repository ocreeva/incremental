import * as React from 'react';

const useForceUpdate: () => React.DispatchWithoutAction
= () => {
    const [, forceUpdate] = React.useReducer(_ => _ + 1, 0);
    return forceUpdate;
};

export default useForceUpdate;
