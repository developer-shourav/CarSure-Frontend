import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
    addToWhitelist as addToWhitelistAction,
    removeFromWhitelist as removeFromWhitelistAction,
    selectWhitelist,
    WhitelistItem,
} from '../redux/features/whitelist/whitelistSlice';

const useWhitelist = () => {
    const dispatch = useAppDispatch();
    const whitelist = useAppSelector(selectWhitelist);

    const addToWhitelist = (item: WhitelistItem) => {
        dispatch(addToWhitelistAction(item));
    };

    const removeFromWhitelist = (id: string) => {
        dispatch(removeFromWhitelistAction(id));
    };

    return {
        whitelist,
        addToWhitelist,
        removeFromWhitelist,
    };
};

export default useWhitelist;