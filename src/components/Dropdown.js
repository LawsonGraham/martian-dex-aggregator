import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({ coin1, coins, setCoin }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300">
          {coin1 ? <div>
            <img src={coin1.icon} style={{height: "20px", display: "inline-block", marginRight: "10px"}}></img>
                    {coin1.name}
          </div>
            
           : "Select"}
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="max-h-60 overflow-y-scroll absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 overflow-scroll">
          {coins.map((coin, index) => (
            <Menu.Item className="font-poppins font-bold text-white py-2">
                <li
                    key={index}
                    onClick={() => {
                        // if (typeof onSelect === "function") onSelect(token);
                        setCoin(coin);
                    }}
                >
                    {<img src={coin.icon} style={{height: "20px", display: "inline-block", marginRight: "10px"}}></img>}
                    {coin.name}
                </li>
                </Menu.Item>
            ))
            }
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}