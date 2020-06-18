/*
* Функция определяет доступ с странице по URL и типу подписки.
* Возвращает URL, куда нужно перейти при необзходимости.
 */
export function checkPermissionByPathname(pathname) {
    let subscription_type_id = parseInt(localStorage.getItem("subscription_type_id"));
    let isExpired = (localStorage.getItem("subscription_expired") === "true");
    console.log(isExpired)
    let exit = false;

    function permitPath(path, permitted_id) {
        if (exit) return;
        if (path === pathname) {
            exit = true;
            if (subscription_type_id < permitted_id) {
                pathname = '/subscription_not_sufficient';
            }
            else if (isExpired) {
                pathname = '/subscription_expired';
            }
        }
    }

    permitPath('/honey_harvest', 2);
    permitPath('/honey_sale', 2);
    permitPath('/control_harvest', 2);
    permitPath('/wiki', 2);
    permitPath('/pollen_harvest', 3);
    permitPath('/harvest_stats', 4);
    permitPath('/sale_stats', 4);
    permitPath('/winter', 4);

    return pathname;
}

