import axios from 'axios'

export class CustomerService {
    getCustomersMedium() {
        return axios.get('assets/demo/data/customers-medium.json')
            .then(res => res.data.data);
    }

    getCustomersLarge() {
        return axios.get('assets/demo/data/customers-large.json')
                .then(res => res.data.data);
    }

    getCustomersChecking() {
        return axios.get('assets/demo/data/customers-checking.json')
            .then(res => res.data.data);
    }

    getCustomersSavings() {
        return axios.get('assets/demo/data/customers-savings.json')
            .then(res => res.data.data);
    }

    getCustomersCheckingData() {
        return axios.get('assets/demo/data/heapbankCheckingData.json')
            .then(res => res.data.data);
    }

    getCustomersSavingsData() {
        return axios.get('assets/demo/data/heapbankSavingsData.json')
            .then(res => res.data.data);
    }

    getCustomersBillPayAccountsData() {
        return axios.get('assets/demo/data/heapbankBillPayAccounts.json')
            .then(res => res.data.data);
    }

    getCustomersFriendPayAccountsData() {
        return axios.get('assets/demo/data/heapbankFriendPayAccounts.json')
            .then(res => res.data.data);
    }
}
