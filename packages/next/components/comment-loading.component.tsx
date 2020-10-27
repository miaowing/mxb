import ContentLoader from 'react-content-loader';
import styles from './comment-loading.component.module.less';

export const Loading = () => (
    <div className={styles.loading}>
        <ContentLoader
            speed={2}
            width={100}
            style={{ width: '100%' }}
            height={45}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb">
            <rect x="52" y="8" rx="3" ry="3" width="100%" height="10"/>
            <rect x="52" y="30" rx="3" ry="3" width="80%" height="10"/>
            <circle cx="20" cy="24" r="20"/>
        </ContentLoader>
    </div>
)
