import React from 'react'
//import the component adminMenu
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu'
//import the component addEmployeeForm
import AddEmployeeForm from '../../components/Admin/AddEmployeeForm/AddEmployeeForm'

function AddEmployee() {
  return (
    <div>
      <div className='container-fluid admin-pages'>
        <div className='row'>
          <div className='col-md-3 admin-left-side'>
            <AdminMenu/>

          </div>
          <div className='col-md-3 admin-right-side'>
            <AddEmployeeForm/>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEmployee