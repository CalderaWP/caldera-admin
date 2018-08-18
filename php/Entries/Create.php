<?php


namespace calderawp\CalderaForms\Admin\Entries;

/**
 * Class Create
 *
 * Creates an entry, possibly with random field data
 *
 * @package calderawp\CalderaForms\Admin\Entries
 */
class Create
{

    /**
     * @var \Caldera_Forms_Entry
     */
    private $entry;
    /**
     * @var int
     */
    private $entryId;
    /**
     * @var array
     */
    private $form;

    /**
     * Create constructor.
     * @param array $form Form to create an entry for.
     */
    public function __construct(array $form )
    {
        $this->form = $form;
    }


    /**
     * (re)Set entry object
     *
     * @param \Caldera_Forms_Entry $entry
     */
    public function setEntry(\Caldera_Forms_Entry $entry ){
        $this->entry = $entry;
        $this->entryId = $entry->get_entry_id();
    }

    /**
     * Get the saved entry
     *
     * @return \Caldera_Forms_Entry
     */
    public function getEntry()
    {
        if( empty( $this->entry ) ){
            $this->queryForEntry();
        }
        return $this->entry;
    }

    /**
     * Get the saved entry ID
     *
     * @return int
     */
    public function getEntryId()
    {
        return $this->entryId;
    }

    /**
     * Create the entry
     *
     * @param array $fieldData Optional. Values for form fields. If empty, random data is used.
     */
    public function createEntry( array $fieldData = [] ){
        $fieldData = empty( $fieldData) ? $this->randomData() : $fieldData;
        $this->entryId = \Caldera_Forms_Save_Final::create_entry( $this->form, $fieldData  );
    }

    /**
     * Query for the saved entry
     */
    protected function queryForEntry(){
        $this->entry = new \Caldera_Forms_Entry(
            $this->form,
            $this->entryId
        );
        $this
            ->entry
            ->query();
    }

    /**
     * Create random field data
     *
     * @return array
     */
    protected function randomData()
    {
            $data = array();
            $i = 0;
            foreach ($this->form['fields'] as $field_id => $field_config) {
                if (1 == $i) {
                    $data[$field_id] = $field_id . '_' . rand();
                } else {
                    $data[$field_id] = array(
                        rand(),
                        5 => rand(), rand(), 'batman'
                    );
                }
                if (0 == $i) {
                    $i = 1;
                } else {
                    $i = 0;
                }
            }

        return $data;
    }
}