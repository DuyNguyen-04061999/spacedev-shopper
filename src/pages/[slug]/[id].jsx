import React from 'react'
import { useParams } from 'react-router-dom'

export default function Category() {
    const { slug, id } = useParams()
    console.log(slug, id)
    return (
        <div>Category</div>
    )
}