import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    valutes: [],
    filteredValutes: [],
    nameValutes: [],
    activeValute: {},

    convertActiveValuteBased: {},
    convertNamesValuteBased: [],

    convertActiveValute: {},
    convertNamesValute: [],

    converResultValue: 1,
    baseValue: 1
  },
  getters: {
    valutes: v => v.valutes,
    nameValutes: s => s.nameValutes,
    activeValute: b => b.activeValute,
    filteredValutes: b => b.filteredValutes,

    convertActiveValuteBased: v => v.convertActiveValuteBased,
    convertNamesValuteBased: s => s.convertNamesValuteBased,

    convertActiveValute: b => b.convertActiveValute,
    convertNamesValute: b => b.convertNamesValute,

    converResultValue: v => v.converResultValue,
    baseValue: v => v.baseValue
  },
  mutations: {
    CLEAR_FILTERED_VALUTES(state) {
      state.filteredValutes = []
    },

    SEARCH_BY_NAME_CODE(state, valueSearch) {
      state.filteredValutes = state.valutes.filter(el => {
        return el.Name.toLowerCase().includes(valueSearch.toLowerCase()) || el.CharCode.toLowerCase().includes(valueSearch.toLowerCase())
      })
    },

    SET_VALUTES(state, valutes) {
      state.valutes = valutes
      
      state.nameValutes = valutes.map(el => {
        return { name: el.Name, active: false, code: el.CharCode }
      });
      state.nameValutes[0].active = true
      state.activeValute = state.valutes[0]

      state.convertNamesValuteBased = valutes.map(el => {
        return { name: el.Name, active: el.CharCode === 'USD'? true : false, code: el.CharCode }
      });
       
      state.convertActiveValuteBased = valutes.filter(el => {
        if (el.CharCode === 'USD') {
          return el
        }
      })[0]

      state.convertNamesValute = valutes.map(el => {
        return { name: el.Name, active: el.CharCode === 'EUR'? true : false, code: el.CharCode }
      });
       
      state.convertActiveValute = valutes.filter(el => {
        if (el.CharCode === 'EUR') {
          return el
        }
      })[0]
    },

    SET_ACTIVE_VALUTE(state, charCode) {
      state.activeValute  = state.valutes.filter(el => el.Name === charCode)[0]

      state.nameValutes.forEach(el => {
        if (el.name === charCode) {
          el.active = true
        } else {
          el.active = false
        }
      })
    },

    SET_CONVERT_BASED_ACTIVE_VALUTE(state, charCode) {
      state.convertActiveValuteBased  = state.valutes.filter(el => el.CharCode === charCode)[0]

      state.convertNamesValuteBased.forEach(el => {
        if (el.code === charCode) {
          el.active = true
        } else {
          el.active = false
        }
      })
    },

    SET_CONVERT_ACTIVE_VALUTE(state, charCode) {
      state.convertActiveValute  = state.valutes.filter(el => el.CharCode === charCode)[0]

      state.convertNamesValute.forEach(el => {
        if (el.code === charCode) {
          el.active = true
        } else {
          el.active = false
        }
      })
    },

    CALC_RESULT_CONVERTOR(state, baseValue) {
      state.baseValue = baseValue
      state.converResultValue = (baseValue * state.convertActiveValuteBased.Value / state.convertActiveValute.Value).toFixed(4)
    },

    REPLACE_VALUTE(state) {
      let convertActiveValute = {...state.convertActiveValute}
      state.convertActiveValute = {...state.convertActiveValuteBased}
      state.convertActiveValuteBased = convertActiveValute
    }
  },
  actions: {
    replaceValute({ commit }) {
      commit("REPLACE_VALUTE");
    },
    setConvertActiveValute({ commit }, CharCode) {
      commit("SET_CONVERT_ACTIVE_VALUTE", CharCode);
    },
    setConvertBasedActiveValute({ commit }, CharCode) {
      commit("SET_CONVERT_BASED_ACTIVE_VALUTE", CharCode);
    },
    calcResultConvertor({ commit }, baseValue) {
      commit("CALC_RESULT_CONVERTOR", baseValue);
    },
    clearFilteredValutes({ commit }) {
      commit("CLEAR_FILTERED_VALUTES")
    },
    searchByNameAndCode({ commit }, valueSearch) {
      commit("SEARCH_BY_NAME_CODE", valueSearch);
    },
    setActiveValute({ commit }, charCode) {
      commit("SET_ACTIVE_VALUTE", charCode);
    },
    async getCurrents({ commit }) {
      try {
        const response = await axios("https://www.cbr-xml-daily.ru/daily_json.js")

        if (response.status >= 200 && response.status < 300 ) {
          const dataValute = response.data.Valute;
          const valutes = Object.values(dataValute)

          if (valutes.length) {
            commit("SET_VALUTES", valutes);
          }
        }
      } catch (error) {
        console.log('Запрос вернулся с ошибкой:', error)
      }
    }
  }
})
