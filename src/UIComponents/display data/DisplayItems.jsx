import React from 'react';
const Items = (props) =>{
    const {todoItems, editItem, delItem} = props;

        return (<tbody>
            {todoItems.map((item, index) => {
                return (<tr key={item.id} className="">
                    <td>{index+1}.</td>
                    <td>{item.todo}</td>
                    <td> 
                    <button className="btn indigo accent-1" onClick={() => {editItem(item.id) }}>
                    Edit</button>
                    </td>
                    <td>
                    <button className="btn grey" onClick={() => {delItem(item.id)}}>
                    Done</button>
                    </td>
                    </tr>)
            })}

        </tbody>)
}
export default Items;