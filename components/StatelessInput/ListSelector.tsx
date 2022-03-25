import React from 'react';

interface IListItem {
  id: string;
  name: string;
}

interface IProps {
  title?: string;
  containerClass?: string;
  itemList: Array<IListItem>;
  selectedItemList: Array<string>;
  onChange: (itemsList: Array<string>) => void;
  showClear?: boolean;
  showAll?: boolean;
}

function ListSelector({
  title = '',
  containerClass = '',
  itemList,
  selectedItemList,
  onChange,
  showAll = false,
  showClear = false,
}: IProps) {
  function setItemList(
    itemID: null | string = null,
    all: boolean,
    none: boolean,
  ) {
    let newList = [...selectedItemList];

    if (itemID !== null) {
      if (newList.includes(itemID)) {
        newList = newList.filter((g) => g !== itemID);
      } else if (!newList.includes(itemID)) {
        newList = [...newList, itemID];
      }
    }
    if (all) {
      newList = (itemList || []).map((g) => g.id);
    }
    if (none) {
      newList = [];
    }
    onChange(newList);
  }

  return (
    <div className={`${containerClass}`}>
      {title !== '' && <h2>{title}</h2>}
      <div className="overflow-x-auto whitespace-nowrap pt-1 hide-scrollbar">
        {showAll && (
          <ListSelectorButton
            id="All"
            onClick={() => setItemList(null, true, false)}
            value="All"
            type="Positive"
          />
        )}
        {showClear && (
          <ListSelectorButton
            id="Clear"
            onClick={() => setItemList(null, false, true)}
            value="Clear"
            type="Negative"
          />
        )}
        {itemList.map((item) => (
          <ListSelectorButton
            id={item.id}
            key={item.id}
            onClick={() => setItemList(item.id, false, false)}
            selected={selectedItemList?.includes(item.id)}
            value={item.name}
          />
        ))}
      </div>
    </div>
  );
}

interface IListSelectorButtonProps {
  id: string;
  onClick: () => void;
  selected?: boolean;
  value: string;
  type?: 'Selector' | 'Positive' | 'Negative';
}

function ListSelectorButton({
  id,
  value,
  selected = false,
  onClick,
  type = 'Selector',
}: IListSelectorButtonProps) {
  function setClass() {
    switch (type) {
      case 'Positive':
        return 'bg-emerald-400 text-white';
      case 'Negative':
        return 'bg-red-400 text-white';
      default:
        return `text-white ${
          selected ? 'bg-brand-500 opacity-100' : 'bg-brand-400 opacity-60'
        }`;
    }
  }

  return (
    <button
      key={id}
      onClick={onClick}
      className={`${setClass()} py-1 px-2 mr-1 mb-1 rounded`}
    >
      {value}
    </button>
  );
}

export default ListSelector;
