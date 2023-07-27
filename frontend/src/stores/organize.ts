import {defineStore} from 'pinia';
import {Category, Feed,} from 'src/types';
import {ORGANIZE_TYPE, OrganizeBlacklist, OrganizeCategory, OrganizeFeed} from 'stores/organizeConfig';

class temp{
  organizeData : OrganizeFeed | OrganizeCategory | OrganizeBlacklist = new OrganizeFeed([])
}

export const useOrganizeStore = defineStore('organizeStore', {
  state: () => {
    return {
      organizeData: new OrganizeFeed([])
    } as temp
  },
  getters: {},
  actions: {
    updateList(feedTitle: string, searchData: string) {
      this.organizeData.updateList(feedTitle, searchData)
      console.log(this.organizeData.dataList)
    },
    setSelected(id: number, status: boolean) {
      this.organizeData.setSelected(id, status)
    },
    async delete(id: number) {
      await this.organizeData.delete(id)
    },
    getSelectedList(): Feed[] | Category[] {
      if (this.organizeData.type === ORGANIZE_TYPE.FEED) {
        return this.organizeData.getSelectedList() as Feed[]
      } else {
        return this.organizeData.getSelectedList() as Category[]
      }
    },
    setListSelected(status: boolean) {
      this.organizeData.setListSelected(status);
    },
    changeType(type : ORGANIZE_TYPE,feedTitle: string, searchData: string){
      if (this.organizeData.type === type){
        return
      }
      switch (type){
        case ORGANIZE_TYPE.FEED:
          this.organizeData = new OrganizeFeed([])
          break
        case ORGANIZE_TYPE.CATEGORY:
          this.organizeData = new OrganizeCategory([])
          break
        case ORGANIZE_TYPE.BLACKLIST:
          this.organizeData = new OrganizeBlacklist([]);
      }
      this.organizeData.updateList(feedTitle,searchData)
    },
  }
});
