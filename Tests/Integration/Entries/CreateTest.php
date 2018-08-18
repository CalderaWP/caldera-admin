<?php


namespace calderawp\CalderaForms\Admin\Tests\Integration\Entries;


use calderawp\CalderaForms\Admin\Entries\Create;
use calderawp\CalderaForms\Admin\Tests\Integration\IntegrationTestCase;

class CreateTest extends IntegrationTestCase
{
    private $formId = 'CF1';

    private $form;

    public function setUp()
    {
        parent::setUp();
        $this->form = [
            'ID' => $this->formId,
            'fields' => [
                'fld1' => [
                    'slug' => 'field_one'
                ],
                'fld2' => [
                    'slug' => 'field_two'
                ],
            ]
        ];
    }



    /**
     * Test that entry is created
     *
     * @covers \calderawp\CalderaForms\Admin\Entries\Create::createEntry()
     */
    public function testCreateEntry(){

        $creator = new Create($this->form);
        $creator->createEntry();
        $this->assertSame(1, \Caldera_Forms_Entry_Bulk::count($this->formId));
    }

    /**
     * Test that entry is created with the right saved data
     *
     * @covers \calderawp\CalderaForms\Admin\Entries\Create::createEntry()
     * @covers \calderawp\CalderaForms\Admin\Entries\Create::getEntryId()
     */
    public function testCreateEntryWithFieldData(){
        $creator = new Create($this->form);
        $creator->createEntry();
        $creator = new Create($this->form);
        $creator->createEntry([
            'fld1' => 'one',
            'fld2' => 'two'
        ]);

        $saved = new \Caldera_Forms_Entry($this->form, $creator->getEntryId() );
        $saved->query();
        $this->assertSame( 'one', $saved->get_field('fld1')->get_value() );
        $this->assertSame( 'two', $saved->get_field('fld2')->get_value() );
    }


    /**
     * Test that when we get entry, it works as expected
     *
     * @covers \calderawp\CalderaForms\Admin\Entries\Create::getEntry()
     * @covers \calderawp\CalderaForms\Admin\Entries\Create::$entry
     * @covers \calderawp\CalderaForms\Admin\Entries\Create::$entryId
     * @covers \calderawp\CalderaForms\Admin\Entries\Create::queryForEntry()
     * @covers \calderawp\CalderaForms\Admin\Entries\Create::getEntryId()
     */
    public function testQueryForEntry(){

        $creator = new Create($this->form);
        $creator->createEntry([
            'fld1' => 'one',
            'fld2' => 'two'
        ]);
        $entryFromCreator = $creator->getEntry();
        $this->assertTrue( is_numeric( $entryFromCreator->get_entry_id() ) );

        $saved = new \Caldera_Forms_Entry($this->form, $creator->getEntryId() );
        $saved->query();
        $this->assertSame(
            $saved->get_field('fld1')->get_value(),
            $entryFromCreator->get_field('fld1')->get_value()
        );
    }

}