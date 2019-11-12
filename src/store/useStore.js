import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react';
import { useObserver } from 'mobx-react-lite';
import { StoreContext } from '../index';

export const useStore = () => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }

  return store;
};

export function inject(selector, baseComponent) {
  const component = ownProps => {
    const store = useContext(MobXProviderContext);
    return useObserver(() => baseComponent(selector({ store, ownProps })));
  };

  component.displayName = baseComponent.name;
  return component;
}
