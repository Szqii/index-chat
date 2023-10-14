export const ProfilePicture = (props: {
    className?: string
}) => {
    return (
        <a data-testid={'profile-picture'}
           href={'https://sezgi.wtf'} target={'_blank'} className={props.className}>
            <img
                className={'rounded-sm w-full h-full object-cover'}
                alt='profile-picture'
                src={'/user-profile.jpg'}
            />
        </a>
    )
}
