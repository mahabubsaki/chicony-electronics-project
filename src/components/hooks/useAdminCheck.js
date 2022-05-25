import axios from "axios"
import { useEffect, useState } from "react"

const useAdminCheck = (email) => {
    // this hook will go to database and give us a boolean value which will be set in admin state
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);
    useEffect(() => {
        const checkUser = async () => {
            const { data } = await axios({
                url: `https://mysterious-shore-40767.herokuapp.com/check-role?email=${email}`,
                method: 'GET',
            })
            setAdmin(data.admin)
            setAdminLoading(false)
        }
        checkUser()
    }, [email])
    return { admin, adminLoading }
}
export default useAdminCheck