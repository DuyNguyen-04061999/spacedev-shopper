import React from 'react'
import { SkeletonStyle } from './style'

export default function Skeleton({ shape = 'rectangle', width, height, children, ...props }) {
    return (
        <SkeletonStyle className={shape} style={{ width, height }} {...props}>{children}</SkeletonStyle>
    )
}