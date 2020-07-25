from note_tools.note import Note


def main():
    Note().create_new('test_note_1').update_name('Name1').add_tag('tag1').add_tag('tag2').save_to_file()
    Note().create_new('test_note_2').update_name('Awesome cool name!').add_tag('tag1').add_tag('tag_3').save_to_file()


if __name__ == '__main__':
    main()
