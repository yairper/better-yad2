setTimeout(() => {
  removeAds()
  wrapYad2Rows()

  setTimeout(showBody)
})

function removeAds () {
  let ads = document.querySelectorAll(`[alt="מודעות Platinum"],
                                       .platinum.pie,
                                       .intro_block,
                                       .banner_strip,
                                       .bannerBetweenTables_main,
                                       .search_banners,
                                       .magazine_block,
                                       #GamboBanner,
                                       #rtower,
                                       #top_banners,
                                       #Hotpics,
                                       #leftSekindo,
                                       #ad_martef,
                                       #ad_martef ~ *`)

  ads.forEach(el => el.parentNode.removeChild(el))
}

function showBody () {
  document.body.classList.add('better-yad2-show')
}

function wrapYad2Rows () {
  let yad2Rows = document.querySelectorAll('.main_table tr.showPopupUnder')
  yad2Rows.forEach(row => new BetterYad2.RowView(row))
}

var BetterYad2 = {
  hiddenRowsModel: {
    _all: JSON.parse(localStorage.getItem('hiddenRows')) || [],

    add (rowId) {
      this._all.push(rowId)
      this._save()
    },

    remove (rowId) {
      this._all = this._all.filter(id => id !== rowId)
      this._save()
    },

    includes (rowId) {
      return this._all.includes(rowId)
    },

    _save () {
      localStorage.setItem('hiddenRows', JSON.stringify(this._all))
    }
  },

  RowView: class {
    constructor (element) {
      this._element = element

      if (BetterYad2.hiddenRowsModel.includes(this._element.id))
        this._toggle()

      this._appendToolbar()

      this._element.querySelector('.better-yad2-toolbar').onclick = e => {
        e.stopPropagation()
      }

      this._element.querySelector('.better-yad2-hide-row').onclick = e => {
        if (this._isShown) {
          this._toggle()
          BetterYad2.hiddenRowsModel.add(this._element.id)
        } else {
          this._toggle()
          BetterYad2.hiddenRowsModel.remove(this._element.id)
        }
      }
    }

    _appendToolbar () {
      var firstCell = this._element.querySelector('td:first-child')
      let toolbar = createElement(`
        <div class="better-yad2-toolbar-container">
          <div class="better-yad2-toolbar">
            <span class="better-yad2-hide-row">&times;</span>
          </div>
        </div>`)

      firstCell.appendChild(toolbar)
    }

    get _isShown () {
      return !this._element.classList.contains('better-yad2-hidden-row')
    }
    _toggle () {
      this._element.classList.toggle('better-yad2-hidden-row')
    }
  }
}

function createElement (html) {
  return document.createRange().createContextualFragment(html)
}
