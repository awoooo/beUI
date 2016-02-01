"woo's vimrc
set ai
set tabstop=4
set shiftwidth=4
set nu
set syntax=on
set nohls
filetype on
"
"加载matchit插件
set nocompatible
filetype plugin on
runtime macros/matchit.vim
"加载结束
set cindent
set ruler

call pathogen#infect()

execute pathogen#infect()
	syntax on
	filetype plugin indent on
let g:winManagerWindowLayout='FileExplorer|TagList'
let Tlist_Use_Right_Window=1
let Tlist_File_Fold_Auto_Close=1

"colorscheme set
syntax on
"set t_Co=256
"set background=dark
"colorscheme solarized
"colorschem end

"comment map
map \\h <ESC>I<!--<ESC>A --><ESC>:w<CR>
map \\c <ESC>I/*  <ESC>A  */<ESC>:w<CR>
map \\j <ESC>O/*<ESC>}o*/<ESC>:w<CR>
map \\\ <ESC>^xxxx<ESC>$xxxx<ESC>:w<CR>

"WinManager plugin
map \wm <ESC>:WMToggle<CR>

"windows size adjust
nmap w= :resize +3<CR>
nmap w- :resize -3<CR>
nmap w, :vertical resize -3<CR>
nmap w. :vertical resize +3<CR>

nmap ww <C-W>w

inoremap jj <ESC>
