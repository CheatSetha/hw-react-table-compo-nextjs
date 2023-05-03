import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { useMemo } from "react"
import { useState } from "react"
import DataTable from "react-data-table-component"

const product = ({ data }) => {
	const [products, setProducts] = useState([])
	const [filterText, setFilterText] = useState("")
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
	const filteredItems = products.filter(
		(item) =>
			item.title && item.title.toLowerCase().includes(filterText.toLowerCase())
	)
	console.log(products)

	const columns = [
		{
			name: "Id",
			selector: (row) => row.id,
            sortable: true,
		},
		{
			name: "Product Name",
			selector: (row) => row.title,
            sortable: true,
		},
		{
			name: "Price",
			selector: (row) => row.price,
            sortable: true,
		},
		{
			name: "Category",
			selector: (row) => row.category.name,
            sortable: true,
		},
		{
			name: "Image",
			selector: (row) => (
				<img
					src={row.images}
					alt={row.title}
					width='100px'
					height='100px'
				/>
			),
		},

		{
			name: "Actions",
			selector: (row) => (
				<div>
					<button className='btn btn-primary mr-5'>Edit</button>
					<button onClick={()=> deleteProduct(row.id)} className='btn btn-error'>Delete</button>
				</div>
			),
		},
	]
	useEffect(() => {
		fetch("https://api.escuelajs.co/api/v1/products")
			.then((res) => res.json())
			.then((data) => setProducts(data))

		//
	}, [])
	const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle)
				setFilterText("")
			}
		}

		return (
			<input
				onChange={(e) => setFilterText(e.target.value)}
				onClear={handleClear}
				filterText={filterText}
				type='text'
				placeholder='Type here'
				className='input input-bordered input-accent w-full max-w-xs text-white'
			/>
		)
	}, [filterText, resetPaginationToggle])
    const rounter = useRouter();

    //  delete product . why it's not refreshing the page?
    // sulution: use router.push('/product') to refresh the page 
    const deleteProduct = (id) => {
        fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
            method: 'DELETE' 
        })
        rounter.push('/product')
    }

	return (
		<>
			<DataTable
				title='product List'
				columns={columns}
				data={filteredItems}
				pagination 
                highlightOnHover
				paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
				subHeader
				subHeaderComponent={subHeaderComponentMemo}
				selectableRows
				persistTableHead
               
			/>
		</>
	)
}

export default product
