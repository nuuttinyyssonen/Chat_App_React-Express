import { useSelector } from "react-redux";

const Main = () => {
    const token = useSelector(({ token }) => {
        return token
    })

    return (
        <div>
            {token}
        </div>
    );
};

export default Main;
