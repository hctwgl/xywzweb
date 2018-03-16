package com.xywztech.bob.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "to_be_delete")
public class CommonSequence {

    @Id
    @SequenceGenerator(name = "CommonSequnce", sequenceName = "ID_SEQUENCE", initialValue = 10000, allocationSize = 1)
    @GeneratedValue(generator = "CommonSequnce", strategy = GenerationType.SEQUENCE)
    protected Long id;

}
