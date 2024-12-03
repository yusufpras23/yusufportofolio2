"use client"
import { useState, useEffect } from "react"
import ConfigDialog from '../../../../../components/ConfirmDialog'

export default function WorkList({
    onEditItem
}){
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [deletdId, setDeletdId]= useState(null)
    const [modal, setModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    const [modalMessage, setModalMessage] = useState("")
    const [modalBtnOk, setModalBtnOk] = useState("")
    const [isOkOnly, setIsOkOnly]= useState(false)

    async function onLoadData() {
        setLoading(true)
        let res = await fetch('/api/work')
        let data = await res.json()
        setData(data.data)
        setLoading(false)
    }

    const onDeleteItem = async (id)=>{
        setIsOkOnly(false)
        setModal(true);
        setModalBtnOk("Delete");
        setModalMessage(`Do you want to delete thes item ${id}`);
        setModalTitle("Confirm Delete?")
        setDeletdId(id);
    }

    const onCancel=()=>{
        setModal(false);
        setDeletdId(null);
    }

    const onSubmitDelete=async ()=>{
        setModal(false);

        const request = {
            deleted_id:deletdId
        }
        
        let res = await fetch(`/api/work`,{
            method:'DELETE',
            body: JSON.stringify(request),
        })

        setModal(true);
        setModalMessage(`Data Berhasil Dihapus`);
        setModalTitle("Info")
        setIsOkOnly(true)
        
        onLoadData()

    }

    useEffect(() => {
        onLoadData()
    }, [])

    return (
        <>
            <ConfigDialog  
                onCancel={()=>onCancel()} 
                onOk={()=>onSubmitDelete()} 
                onOkOny={()=>onCancel()} 
                showDialog={modal}
                title={modalTitle}
                message={modalMessage}
                okBtnMessage={modalBtnOk}
                isOkOnly={isOkOnly} />

            <table className="table-auto">
                <thead>
                    <tr>
                        <th className='p-2 border-b border-blue-gray-100 bg-gray-100'>#No</th>
                        <th className='p-2 border-b border-blue-gray-100 bg-gray-100'>Title</th>
                        <th className='p-2 border-b border-blue-gray-100 bg-gray-100'>Employe Type</th>
                        <th className='p-2 border-b border-blue-gray-100 bg-gray-100'>Company Name</th>
                        <th className='p-2 border-b border-blue-gray-100 bg-gray-100'>Location</th>
                        <th className='p-2 border-b border-blue-gray-100 bg-gray-100'>Start Date</th>
                        <th className='p-2 border-b border-blue-gray-100 bg-gray-100'>End Date</th>
                        <th className='p-2 border-b border-blue-gray-100 bg-gray-100'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { loading &&  <tr><td colSpan={8}>Loading...</td></tr> }
                    {!loading && data.map((item,idx)=>{

                        return (
                            <tr key={idx} className='border-b border-blue-gray-50'>
                                <td className='p-2 '>{idx + 1}</td>
                                <td className='p-2 '>{item.title} </td>
                                <td className='p-2 '>{item.employeType}</td>
                                <td className='p-2 '>{item.companyName}</td>
                                <td className='p-2 '>{item.location}</td>
                                <td className='p-2 '>{item.startDate}</td>
                                <td className='p-2 '>{item.endDate}</td>
                                <td className='p-2 '>
                                    <div className="inline-flex text-[12px]">
                                        <button onClick={()=>onEditItem(item._id)} className=" bg-green-300 hover:bg-green-400 text-gray-800 py-2 px-4 rounded-l">
                                            Edit
                                        </button>
                                        <button onClick={()=>onDeleteItem(item._id)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-r">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                        })
                    }
                    
                </tbody>
            </table>
        </>
    )
}