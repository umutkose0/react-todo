import ReactModal from "react-modal";
import {useEffect, useState} from "react"

const Header=({addTodo,searchHandle})=>{
    
    const customStyles={
        content:{
            border:'0px',
            boxShadow:'1px 3px 20px 1px',
            top: '40%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width:'40vw',
            height:'30vh',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            padding:'40px 20px',
            borderRadius:'4px'
        }
    }
    const [modalIsOpen,setIsOpen]=useState(false);
    const [title,setTitle]=useState('');
    const [desc,setDesc]=useState('');
    const [search,setSearch]=useState('');
    const clickHandle=()=>{
        setIsOpen(true);
    }
    const  closeModal=()=>{
        setIsOpen(false);
      }
    const saveHandle=(e)=>{
        e.preventDefault();
        addTodo(title,desc);
        closeModal();
    }
    useEffect(()=>{
        searchHandle(search)
    },[search])
    return (
        <header>
            <input className="txt-search" type="text" onChange={(e)=>{setSearch(e.target.value)}} value={search} />
            <button className="btn-add" onClick={clickHandle}>+</button>
            <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Todo"
      >
        <form className="todo-form">
            <div>
                <input onChange={(e)=>{setTitle(e.target.value)}} value={title} placeholder="Title"/>
                <input onChange={(e)=>{setDesc(e.target.value)}} value={desc} placeholder="Description"/>
          </div>
          <div>
          <button onClick={closeModal}>Cancel</button>
          <button disabled={!title} onClick={saveHandle}>Save</button>
          </div>
          
        </form>
      </ReactModal>
        </header>
    );
}
export default Header;