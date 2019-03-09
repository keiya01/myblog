export const formatDateTime = (time) => {
    const date = new Date(time);
    const year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDay();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    const format = (date) => {
        if (date < 10) {
            return `0${date}`
        }

        return date
    }

    const visible = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        let currentMonth = currentDate.getMonth();
        let currentDay = currentDate.getDay();
        let currentHours = currentDate.getHours();
        let currentMinutes = currentDate.getMinutes();
        switch (true) {
            case year < currentYear:
            case month < currentMonth:
            case day < currentDay:
                const visibleDay = currentDay - day;
                if(visibleDay === 1) {
                    return 'yesterday';
                }
                if(visibleDay > 5) {
                    break;
                }
                return `${visibleDay} day ago`;
            case hours < currentHours:
                const visibleHours = currentHours - hours;
                return `${visibleHours} hours ago`;
            case minutes < currentMinutes:
                const visibleMinutes = currentMinutes - minutes;
                return `${visibleMinutes} minutes ago`;
            case minutes >= currentMinutes:
                return 'now';
        }
        return `${year}-${format(month)}-${format(day)}`
    }
    
    return visible()

}