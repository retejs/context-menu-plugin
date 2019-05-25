import './style.sass';
import Item from './Item';
import Context from './context';

export default ({ items, position: [x, y], visible, args, onClose }) => {
    if(!visible) return null;
    
    return (
        <Context.Provider value={{ args, onClose}}>
            <div className="context-menu" style={{ left: x+'px', top: y+'px' }}>
                {items.map(item => (
                    <Item item={item} />
                ))}
            </div>
        </Context.Provider>
    )
}