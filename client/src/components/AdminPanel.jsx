import CategoriesForm from './CategoriesForm'
import UsersPanel from './UsersPanel'

const AdminPanel = () =>{

    return(
        <div className="admin-panel">
            <CategoriesForm/>
            <UsersPanel/>
        </div>
    )
}

export default AdminPanel;