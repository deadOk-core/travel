import { memo, type ReactNode } from "react"
import styles from './Styles.module.scss'

const CoverBackgroundComponent = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.cover}>
            {children}
        </div>
    )   
}

export const CoverBackground = memo(CoverBackgroundComponent)