
const mockAxios = jest.genMockFromModule('axios')

// this is the key to fix the axios.create() undefined error!
mockAxios.create = jest.fn(() => mockAxios)
mockAxios.get = jest.fn().mockResolvedValue({ data: [{}] })
mockAxios.put = jest.fn().mockResolvedValue({ data: [{}] })
mockAxios.post = jest.fn().mockResolvedValue({ data: [{}] })
mockAxios.delete = jest.fn().mockResolvedValue({ data: [{}] })

export default mockAxios